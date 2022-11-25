
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')
const post = require('../model/post')

const User = require('../model/user')
const Post = require('../model/post')
const Hobby = require('../model/hobby')

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Schema type for user',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find({ userId: parent.id })
            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return Hobby.find({ userId: parent.id })
            }
        }
    })
})

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby type description',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return { id: parent.userId, name: 'user in hobby' }
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post Type description',
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return { id: parent.userId, name: 'alan' }
            }
        },

    })
})


//Rootquery for resolver API
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'Root query',
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return User.findById(args.id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find()
            }
        },
        hobby: {
            type: HobbyType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Hobby.findById(args.id)
            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return Hobby.find()
            }
        },
        post: {
            type: PostType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return Post.findById(args.id)
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find()
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                //id: { type: GraphQLID },//autocreated
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                profession: { type: GraphQLString },
            },
            resolve(parent, args) {
                let user = User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                })

                return user.save()
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                profession: { type: GraphQLString }
            },
            resolve(parent, args) {
                return updateUser = User.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            age: args.age,
                            profession: args.profession
                        }
                    },
                    { new: true }
                )
            }
        },
        removeUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                let removedUser = User.findByIdAndRemove(args.id).exec()
                if (!removedUser) {
                    throw new "Error deleting user"()
                }
                return removedUser
            }
        },
        createPost: {
            type: PostType,
            args: {
                //id: { type: GraphQLID },
                comment: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let post = Post({
                    comment: args.comment,
                    userId: args.userId
                })
                return post.save()
            }
        },
        updatePost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                comment: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return updatePost = Post.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            comment: args.comment
                        }
                    },
                    { new: true }
                )
            }
        },
        removePost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let removedPost = Post.findByIdAndRemove(args.id).exec()
                if (!removedPost) {
                    throw "Error deleting post"()
                }
                return removePost
            }
        },
        createHobby: {
            type: HobbyType,
            args: {
                //id: { type: GraphQLID },
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let hobby = Hobby({
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                })
                //inser to db
                return hobby.save()
            }
        },
        updateHobby: {
            type: HobbyType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return updateHobby = Hobby.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            title: args.title,
                            description: args.description,
                        }
                    },
                    { new: true }
                )
            }
        },
        removeHobby: {
            type: HobbyType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let removedHobby = Hobby.findByIdAndRemove(args.id).exec()
                if (!removedHobby) {
                    throw "Error deleting hobby"()
                }
                return removedHobby
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
