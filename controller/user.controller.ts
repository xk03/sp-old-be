import {Request, Response} from "express";
import application from "../constants/application";

import userService from "../service/user.service";

const createUser = async function (req: Request, res: Response) {
	let user: any;
	try {
		user = await userService.createUser(req.body);
	} catch (error: any) {
		res.status(500).send({err: error.message, success: false});
		return;
	}

	if (user) {
		res.status(200).send({data: user, success: true});
	} else {
		res.status(500).send({success: false});
	}
};

const getOneUser = async function (req: Request, res: Response) {
	let user: any;
	try {
		user = await userService.getUserByUniqueId(req.params.unique_id);
	} catch (error: any) {
		res.status(500).send({err: error.message, success: false});
		return;
	}

	if (user) {
		res.status(200).send({data: user, success: true});
	} else {
		res.status(500).send({success: false});
	}
};

const getUsers = async function (req: Request, res: Response) {
	let users: any;
	try {
		users = await userService.getAllUsers(req.query);
	} catch (error: any) {
		res.status(500).send({err: error.message, success: false});
		return;
	}

	if (users) {
		res.status(200).send({data: users, success: true});
	} else {
		res.status(500).send({success: false});
	}
};

const updateUserStatus = async function (req: Request, res: Response) {
	let user: any;
	try {
		user = await userService.updateUserStatus(req.body.unique_id, req.body.status);
	} catch (error: any) {
		res.status(500).send({err: error.message, success: false});
		return;
	}

	if (user) {
		res.status(200).send({user, success: true});
	} else {
		res.status(500).send({success: false});
	}
};

const generateToken = async function (req: Request, res: Response) {
	let token: any;
	try {
		token = await userService.generateToken({});
	} catch (error: any) {
		res.status(500).send({err: error.message, success: false});
		return;
	}

	if (token) {
		res.status(200).send({auth_token: token, success: true});
	} else {
		res.status(500).send({success: false});
	}
};

const sendTelegram = async function (req: Request, res: Response) {
	const {message, isOnline, id, keyboard} = req.body;
	if (!message) return res.status(500).send({error: "Ouch!!", success: false});
	try {
		const data = await userService.sendTelegramMessage(message, isOnline, id, keyboard);
		res.status(400).send({data: "Opps, something went wrong"});
	} catch (error) {
		res.status(500).send({error: error, success: false});
	}
};

export default {
	createUser,
	getUsers,
	getOneUser,
	updateUserStatus,
	generateToken,
	sendTelegram,
};
