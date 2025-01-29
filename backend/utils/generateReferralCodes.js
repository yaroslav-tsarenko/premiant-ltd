const User = require('../models/User');
const Referal = require('../models/Referal');

const generateReferralCodes = async () => {
    try {
        const users = await User.find();
        console.log('Users found:', users.length);

        for (const user of users) {
            let existingReferral = await Referal.findOne({ email: user.email });
            if (existingReferral) {
                console.log(`Referral already exists for email: ${user.email}`);
                continue;
            }

            let referralCode = Referal.prototype.generateReferralCode(user.name, user.secondName);
            existingReferral = await Referal.findOne({ referralCode });
            let counter = 1;

            while (existingReferral) {
                referralCode = `${Referal.prototype.generateReferralCode(user.name, user.secondName)}${counter}`;
                existingReferral = await Referal.findOne({ referralCode });
                counter++;
            }

            user.referralCode = referralCode;
            await user.save();
            const referal = new Referal({
                userId: user._id,
                email: user.email,
                referralCode: referralCode,
            });
            await referal.save();
        }
        console.log('Referral codes generated for all users:', users.length);
    } catch (error) {
        console.error('Error generating referral codes:', error);
    }
};

module.exports = generateReferralCodes;