import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { CosmeticsPack } from "../../database/schema/CosmeticsPack";
import { User } from "../../database/schema/User";
import { randomAsciiString } from "../../utils/utils";

import path from 'path'
import fileExists from 'file-exists'
import Q from 'q'
import AdmZip from "adm-zip";
import { Cosmetic } from "../../database/schema/Cosmetic";

export class PackController {
    async index(req : Request, res : Response) {

    }
    
    async download(req : Request, res : Response) {
        const { id } = req.params;

        CosmeticsPack.findOne({
            where: {
                id: id
            }
        }).then(pack => {
            if(!pack) {
                return res.status(401);
            }

            res.sendFile(pack.path);
        })
    }
    
    private tryNewRandomString(getUniqueFilepathDeferred: any, res: Response) {
        var newFileName = randomAsciiString(10);
        var uploadPath = path.join(process.env.UPLOAD_DIRECTORY as string, newFileName);
    
        fileExists(uploadPath, (err, doesFileExist) => {
            if(err) {
                return res.status(401).json({
                    success: false,
                    message: err
                });
            }
    
            if (doesFileExist) {
                this.tryNewRandomString(getUniqueFilepathDeferred, res);
            } else {
                getUniqueFilepathDeferred.resolve({ fileName: newFileName, path: uploadPath });
            }
        });
    };
    
    async upload(req : Request, res : Response) {
        if(!req.files || !req.files.file) {
            return res.status(401).json({
                success: false,
                message: "No file was uploaded"
            });
        }
    
        const file = req.files.file as UploadedFile;
        const fileExtension = path.extname(file.name);
        const pack_id = req.body.pack_id;
    
        if(pack_id) {
            CosmeticsPack.findOne({
                where: {
                    id: pack_id
                }
            }).then(pack => {
                if(pack) {
                    file.mv(pack.path, async err => {
                        if (err) {
                            return res.status(401).json({
                                success: false,
                                message: err
                            });
                        }
                    });
                }
            })
        } else {    
            const getUniqueFilepathDeferred = Q.defer();
            this.tryNewRandomString(getUniqueFilepathDeferred, res);
    
            getUniqueFilepathDeferred.promise.then(payload => {
                // Move files
                //@ts-expect-error
                file.mv(payload.path + fileExtension, async (err) => {
                    if (err) {
                        return res.status(401).json({
                            success: false,
                            message: err
                        });
                    }
    
    
                    const pack = await CosmeticsPack.create({
                        //@ts-expect-error
                        path: payload.path + fileExtension,
                        publisher: req.user
                    });
    
                    const cosmetics : Array<Cosmetic> = await this.parseCosmeticsPack(pack);
    
                    pack.update({
                        cosmetics: cosmetics
                    });
                });
            });
        }
    }
    
    parseCosmeticsPack(pack: CosmeticsPack) : Array<Cosmetic> {
        const cosmetics : Array<Cosmetic> = Array<Cosmetic>();
        const zip = new AdmZip(pack.path);
    
        //read all files under assets/cosmeticsmod/cosmetics/
        const folder = zip.getEntry("assets/cosmeticsmod/cosmetics");
        const name = folder?.entryName;
        const len = name?.length;
    
        zip.getEntries().forEach(entry => {
            if(entry.entryName.substr(0, len) === name) {
                const json = JSON.parse(entry.getData().toString('utf8'))
    
                Cosmetic.findOrCreate({
                    where: {
                        identifier: json.id
                    },
                    defaults: {
                        identifier: json.id,
                        name: json.name,
                        display_name: json.display_name,
                        cosmetics_pack: pack
                    }
                }).then(cosmetic => {
                    cosmetics.push(cosmetic[0]);
                })
            }
        })
    
        return cosmetics;
    }
}