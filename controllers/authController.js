const db = require("../database/models")
const Users = db.Users
const Blacklist = db.Blacklist
const jwt = require('jsonwebtoken')
const passwordHash = require('password-hash')
require("dotenv").config()

const register = async (input, res) => {
    try {
        /* input mengambil dari route hasil validasi 
           jadi di controller sudah bersih tidak ada logic pengecekan lagi
        */
        const save = await Users.create(input)
        res.json(save).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}
/**
 *
 *
 * @param {*} req
 * @param {*} res
 */
const authentication = async (req, res) => {
    try {
        const username = req.body.username.trim();
        const password = req.body.password.trim();
        const cekUsername = await Users.findOne({ where: { username: username } });
        const fetchResult = cekUsername.dataValues
        const verify = passwordHash.verify(password, fetchResult.password);

        /*  cek apakah password yanng di input sama dengan yang ada didatabase
            lalu di cocokan menggunakan hash
        */
        if (verify != true) {
            res.json({ msg: 'Password incorect !' }).status(422)
        } else {

            // isi value token kita mau apa aja
            const userToken = {
                id: fetchResult.id,
                username: fetchResult.username
            }

            /*  set token dengan value usertoken
                set secret key token kita untuk nanti validasi
                set expires token nya
                lalu kasih balikan berupa token jika login sukses
            */
            jwt.sign({ userToken }, process.env.JWT_KEY, {
                expiresIn: '8d' //set exipre token
            }, (err, token) => {
                res.json({ token: token }).status(200)
            });
        }
    } catch (error) {
        // kondisi jika username atau password salah
        res.json({ msg: `username or password not match ${error}` }).status(422);
    }
}

const logout = async (req, res) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]
            await Blacklist.create({ token: token })
            res.json({ msg: 'Logout sucessfully' }).status(200);
        } else {
            res.json({ msg: 'Token required' }).status(422);
        }
    } catch (error) {
        console.log(error);
        res.json({ msg: error }).status(422);
    }
}

module.exports = {
    register, authentication, logout
}
