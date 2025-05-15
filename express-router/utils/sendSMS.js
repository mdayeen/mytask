import twilio from "twilio";

async function sendSMS(smsbody) {
    try {
        // Initialize Twilio client
        const client = twilio(
            process.env.TWILIO_SID,
            process.env.TWILIO_TOKEN
        );

        // Log the SMS configuration (excluding auth token)
        console.log('SMS Configuration:', {
            accountSid: process.env.TWILIO_SID,
            from: process.env.TWILIO_NUMBER,
            to: smsbody.to
        });

        // Ensure phone number is in E.164 format
        const formattedNumber = smsbody.to.startsWith('+') ? smsbody.to : `+${smsbody.to}`;

        let message = await client.messages.create({
            body: smsbody.body,
            from: process.env.TWILIO_NUMBER,
            to: formattedNumber
        });

        console.log('SMS sent successfully:', {
            sid: message.sid,
            status: message.status,
            to: message.to
        });
        return true;
    } catch (error) {
        console.error('Failed to send SMS:', {
            error: error.message,
            code: error.code,
            status: error.status,
            moreInfo: error.moreInfo
        });
        throw error;
    }
}

export default sendSMS;

// let smsbody = 3eb5d53adb7b1e758ffeeec2f6972327{
//     body: "this is a reminder",
//     to: "+919014828737"
// }

// sendSMS({
//     body: `Thank you for Signing Up. Please click on the given link to verify your phone. http://192.168.68.133:5000/api/verify/mobile/`,
//     to: "+919703534849"
// })