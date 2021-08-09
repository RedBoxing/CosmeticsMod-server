import { Request, Response } from "express";
import { Cosmetic } from "../../database/schema/Cosmetic";
import { CosmeticData } from "../../database/schema/CosmeticData";
import { CosmeticsPack } from "../../database/schema/CosmeticsPack";
import { User } from "../../database/schema/User";
import { fileHash } from "../../utils/utils";

export class UserController {
    async show(req : Request, res : Response) {
        const uuid = req.params.uuid;
    
        User.findOne({
            where: {
                uuid: uuid
            },
            include: [
                {
                    model: CosmeticData,
                    include: [
                        {
                            model: Cosmetic,
                            include: [CosmeticsPack]
                        }
                    ]
                }
            ]
        }).then(user => {
            if(!user) {
                return res.json({});
            }
    
            const json = {
                cosmetics_packs: Array<any>(),
                cosmetics: Array()
            }

            user.cosmetics.forEach(async cosmetic => {
                if(!json.cosmetics_packs.find(p => p.id === cosmetic.cosmetic.cosmetics_packId)) {
                    json.cosmetics_packs.push({
                        id: cosmetic.cosmetic.cosmetics_packId,
                        hash: await fileHash(cosmetic.cosmetic.cosmetics_pack.path)
                    });
                }

                json.cosmetics.push({
                    id: cosmetic.cosmetic.identifier,
                    data: cosmetic.data
                });
            })

            res.json(json);
        })
    }
    
    async update(req : Request, res : Response) {
    
    }
}