import { Request, Response } from "express";
import { CosmeticData } from "../../database/schema/CosmeticData";
import { User } from "../../database/schema/User";
import { fileHash } from "../../utils/utils";

import * as logger from '../../utils/logger';

export class UserController {
    async show(req : Request, res : Response) {
        const uuid = req.params.uuid;
    
        User.findOne({
            where: {
                uuid: uuid
            }
        }).then(user => {
            if(!user) {
                return res.json({});
            }
    
            const json = {
                cosmetics_packs: Array<any>(),
                cosmetics: Array()
            }

            console.log(user);

            user.cosmetics.forEach(async cosmetic => {
                if(!json.cosmetics_packs.find(p => p.id === cosmetic.cosmetic.cosmetics_pack_id)) {
                    json.cosmetics_packs.push({
                        id: cosmetic.cosmetic.cosmetics_pack_id,
                        hash: await fileHash(cosmetic.cosmetic.cosmetics_pack.path)
                    });
                }

                json.cosmetics.push({
                    id: cosmetic.cosmetic.identifier,
                    data: cosmetic.data
                });
            })

            res.json(json);

           /* CosmeticData.findAll({
                where: {
                    user_id: user.id
                }
            }).then(cosmetics_data => {
                if(!cosmetics_data) {
                    return res.json({});
                }
                
                cosmetics_data.forEach(async cosmetic => {
                    console.log(cosmetic);
                    if(!json.cosmetics_packs.find(p => p.id === cosmetic.cosmetic.cosmetics_pack_id)) {
                        json.cosmetics_packs.push({
                            id: cosmetic.cosmetic.cosmetics_pack_id,
                            hash: await fileHash(cosmetic.cosmetic.cosmetics_pack.path)
                        });
                    }

                    json.cosmetics.push({
                        id: cosmetic.cosmetic.identifier,
                        data: cosmetic.data
                    });
                })

                res.json(json);
            })*/
        })
    }
    
    async update(req : Request, res : Response) {
    
    }
}