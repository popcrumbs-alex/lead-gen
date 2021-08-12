const bcrypt = require('bcryptjs');
const AuthCode = require('../models/AuthCode');
const { gql } = require('apollo-server-express');



module.exports.typeDefs = gql`
    type AuthCode {
        code: String
        name: String
    }
    type Mutation {
        generateAuthCode: AuthCodeResponse
    }
    type AuthCodeResponse {
        message: String
        success: String
        code: AuthCode
    }
`

module.exports.resolvers = {
    Mutation: {
        generateAuthCode: async () => {
            try {

                if (process.env.AUTH_CODE) {

                    const foundAuthCode = await AuthCode.findOne({ name: process.env.CODE_NAME });

                    if (foundAuthCode) {
                        const isMatch = await bcrypt.compare(foundAuthCode.code, process.env.AUTH_CODE);

                        if (isMatch) {
                            console.log('auth code exists')
                            return res.status(200).json({ msg: 'This auth code already exists' })
                        }

                    }

                    const salt = await bcrypt.genSalt(10)

                    const hash = await bcrypt.hash(process.env.AUTH_CODE, salt);

                    const newAuthCode = new AuthCode({
                        code: hash,
                        name: process.env.CODE_NAME
                    })

                    await newAuthCode.save();


                    return {
                        message: "Successfully generated a new auth code",
                        success: true,
                        code: newAuthCode
                    }

                }

            } catch (error) {
                console.log(error);

                throw new Error(error)
            }
        }
    }
}

