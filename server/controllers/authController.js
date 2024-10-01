const AuthSchema = require('../models/authModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

  

    const user = await AuthSchema.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'Mail sistemde zaten kayıtlıdır.' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: 'Parola 6 karakterden küçük olamaz.' });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ msg: 'Mail formatı yanlış girildi.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await AuthSchema.create({
      username,
      email,
      password: passwordHash,
    });

    const token = jwt.sign({ id: newUser._id }, 'SECRET_KEY', {
      expiresIn: '1h',
    });

    res.status(200).json({
      status: 'OK',
      newUser,
      token,
    });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthSchema.findOne({email});

    if (!user) {
      return res.status(404).json({ msg: 'Kullanıcı bilgileri bulunamadı' });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(404).json({ msg: 'Girilen şifre yanlış' });
    }

    const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });

    res.status(200).json({
      status: 'OK',
      user,
      token,
    });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

function isEmail(email) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(regex)) return true;
  else return false;
}

module.exports = { register, login };
