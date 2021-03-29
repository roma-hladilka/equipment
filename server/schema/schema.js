const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
} = graphql;

const Materails = require('../models/material');
const Shields = require('../models/shield');
const Swords = require('../models/sword');

const MaterailType = new GraphQLObjectType({
    name: 'Material',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        durability: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        strength: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        shields: {
            type: new GraphQLList(ShieldType),
            resolve(parent, args) {
                return Shields.find({ materialId: parent.id });
            },
        },
        swords: {
            type: new GraphQLList(SwordType),
            resolve(parent, args) {
                return Swords.find({ materialId: parent.id });
            },
        },
    }),
});

const SwordType = new GraphQLObjectType({
    name: 'Sword',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        durability: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        attack: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        material: {
            type: MaterailType,
            resolve(parent, args) {
                return Materails.findById(parent.materialId);
            }
        },
        isUpgraded: {
            type: new GraphQLNonNull(GraphQLBoolean),
        },
    }),
});

const ShieldType = new GraphQLObjectType({
    name: 'Shield',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        durability: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        protection: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        material: {
            type: MaterailType,
            resolve(parent, args) {
                return Materails.findById(parent.materialId);
            }
        },
        isUpgraded: {
            type: new GraphQLNonNull(GraphQLBoolean),
        },
    }),
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addSword: {
            type: SwordType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                durability: {
                    type: new GraphQLNonNull(GraphQLInt),
                },
                attack: {
                    type: new GraphQLNonNull(GraphQLInt),
                },
                materialId: {
                    type: new GraphQLNonNull(GraphQLID),
                },
            },
            resolve(parent, args) {
                const sword = new Swords({
                    name: args.name,
                    durability: args.durability,
                    attack: args.attack,
                    materialId: args.materialId,
                    isUpgraded: false,
                });

                return sword.save();
            },
        },
        addShield: {
            type: ShieldType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                durability: {
                    type: new GraphQLNonNull(GraphQLInt),
                },
                protection: {
                    type: new GraphQLNonNull(GraphQLInt),
                },
                materialId: {
                    type: new GraphQLNonNull(GraphQLID),
                },
            },
            resolve(parent, args) {
                const shield = new Shields({
                    name: args.name,
                    durability: args.durability,
                    protection: args.protection,
                    materialId: args.materialId,
                    isUpgraded: false,
                });

                return shield.save();
            },
        },
        deleteSword: {
            type: SwordType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, args) {
                return Swords.findByIdAndRemove(args.id, { useFindAndModify: false, });
            }
        },
        deleteShield: {
            type: ShieldType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, args) {
                return Shields.findByIdAndRemove(args.id, { useFindAndModify: false, });
            }
        },
        upgradeSword: {
            type: SwordType,
            args: {
                id: {
                    type: GraphQLID,
                },
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                durability: {
                    type: new GraphQLNonNull(GraphQLInt),
                },
                attack: {
                    type: new GraphQLNonNull(GraphQLInt),
                },
            },
            resolve(parent, args) {
                return Swords.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            durability: args.durability,
                            attack: args.attack,
                            isUpgraded: true,
                        }
                    },
                    {
                        new: true,
                        useFindAndModify: false,
                    },
                );
            },
        },
        upgradeShield: {
            type: ShieldType,
            args: {
                id: {
                    type: GraphQLID,
                },
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                durability: {
                    type: new GraphQLNonNull(GraphQLInt),
                },
                protection: {
                    type: new GraphQLNonNull(GraphQLInt),
                },
            },
            resolve(parent, args) {
                return Shields.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            durability: args.durability,
                            protection: args.protection,
                            isUpgraded: true
                        }
                    },
                    {
                        new: true,
                        useFindAndModify: false,
                    },
                );
            },
        },
    },
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        sword: {
            type: SwordType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Swords.findById(args.id);
            }
        },
        shield: {
            type: ShieldType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Shields.findById(args.id);
            }
        },
        swords: {
            type: new GraphQLList(SwordType),
            resolve(parent, args) {
                return Swords.find({});
            }
        },
        shields: {
            type: new GraphQLList(ShieldType),
            resolve(parent, args) {
                return Shields.find({});
            }
        },
        materials: {
            type: new GraphQLList(MaterailType),
            resolve(parent, args) {
                return Materails.find({});
            }
        }
    },
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
