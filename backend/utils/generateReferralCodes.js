const User = require('../models/User');
const Referal = require('../models/Referal');


const generateReferralCodes = async () => {
    try {
        const users = await User.find();
        console.log('Users found:', users.length);

        for (const user of users) {
            const referralCode = Referal.prototype.generateReferralCode(user.name, user.secondName);
            const existingReferral = await Referal.findOne({ referralCode });

            if (!existingReferral) {
                user.referralCode = referralCode;
                await user.save();

                const referal = new Referal({
                    userId: user._id,
                    email: user.email,
                    referralCode: referralCode,
                });
                await referal.save();
            } else {
                console.log(`Referral code ${referralCode} already exists for user ${user.email}`);
            }
        }
        console.log('Referral codes generated for all users:', users.length);
    } catch (error) {
        console.error('Error generating referral codes:', error);
    }
};
module.exports = generateReferralCodes;