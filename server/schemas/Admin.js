const { gql } = require("apollo-server-express");
const AuthCode = require('../models/AuthCode');
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.typeDefs = gql`
        type Access {
            tier: Float
        }
        
        type Admin {
            name: String
            email: String @constraint(format: email, maxLength: 100)
            restrictions: Access
            role: String
        }
        
        type Mutation {
            createAdmin(name: String, email: String, tier: Float, authCode: String,role: String): CreateAdminResponse
            authenticate(email: String, authCode: String): AuthenticateResponse
        }

        type CreateAdminResponse {
            message: String
            success: Boolean
            admin: Admin
            token: ID!
        }
        type AuthenticateResponse {
            message: String
            success: Boolean
            admin: Admin
            token: ID!
        }
`

module.exports.resolvers = {
    Mutation: {
        createAdmin: async (_, { name, email, tier, authCode, role }) => {

            if (!name) throw new Error('No name was passed')

            if (!email) throw new Error('No email was passed')

            if (tier === null) throw new Error('No restrictive tiers were passed')

            if (!authCode) throw new Error('No auth code passed')

            if (!role) throw new Error('No user role was provided');

            try {

                if (!process.env.CODE_NAME) throw new Error('No existing code name')

                const foundAuthCode = await AuthCode.findOne({ name: process.env.CODE_NAME })

                const isMatch = await bcrypt.compare(authCode, foundAuthCode.code)

                console.log('is auth code correct', isMatch);

                if (!isMatch) throw new Error('Error: Auth Code is incorrect')

                const newAdmin = new Admin({
                    name,
                    email,
                    role,
                    restrictions: {
                        tier
                    }
                })

                await newAdmin.save();


                const payload = {
                    admin: {
                        id: newAdmin.id
                    }
                }

                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 })

                return {
                    message: 'Created a new admin account',
                    success: true,
                    admin: newAdmin,
                    token
                }

            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },

        authenticate: async (_, { email, authCode }) => {
            if (!email) throw new Error('No Email Provided');
            if (!authCode) throw new Error('No Auth Code Provided');

            try {
                const foundAdmin = await Admin.findOne({ email });

                const foundAuthCode = await AuthCode.findOne({ name: process.env.CODE_NAME })

                if (!foundAdmin) throw new Error('An admin with this email has yet to exist');

                //need to check authorization code with that stored in db
                //code is subject to change
                const isMatch = await bcrypt.compare(authCode, foundAuthCode.code);

                if (!isMatch) throw new Error('Incorrect auth code')

                const payload = {
                    admin: {
                        id: foundAdmin.id
                    }
                }

                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 });

                return {
                    message: 'Successful login',
                    success: true,
                    admin: foundAdmin,
                    token
                }

            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        }
    }
}