import Store from "electron-store";
import {
	ClientCredentials,
	ResourceOwnerPassword,
	AuthorizationCode,
} from "simple-oauth2";
import { ipcMain } from "electron";

const oauthConfig = {
	//how to keep these values hidden/read from env file but still have their values available in shipped code?
};

export function loadListeners() {
	if (ipcMain) {
		ipcMain.on("google-auth", (event) => {});
	}
}

export default function OAuthHandler_Start() {}
