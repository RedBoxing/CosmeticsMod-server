import { Request, Response } from "express";
import { CosmeticData } from "../../database/schema/CosmeticData";
import { User } from "../../database/schema/User";

import crypto from 'crypto'
import { fileHash } from "../../utils/utils";

export class UserController {
    async show(req : Request, res : Response) {
        const uuid = req.params.uuid;
    
        User.findOne({
            where: {
                uuid: uuid
            }
        }).then(async user => {
            if(!user) {
                return res.json({});
            }
    
            const json = {
                cosmetics_packs: Array<any>(),
                cosmetics: Array()
            }

            CosmeticData.findAll({
                where: {
                    user_id: user.id
                }
            }).then(cosmetics_data => {
                cosmetics_data.forEach(async cosmetic => {
                    if(!json.cosmetics_packs.find(p => p.id === cosmetic.cosmetic.cosmetics_pack_id)) {
                        json.cosmetics_packs.push({
                            id: cosmetic.cosmetic.cosmetics_pack_id,
                            hash: await fileHash(cosmetic.cosmetic.cosmetics_pack.path)
                        });
                    }

                    json.cosmetics.push({
                        id: cosmetic.cosmetic.identifier,
                        data: cosmetic?.data
                    });
                })
            })
    
            res.json(json);
        })
    }
    
    async update(req : Request, res : Response) {
    
    }
}