import { Client, Databases, Storage, ID, Query, Account } from "appwrite";

class AppwriteClient {
    constructor() {
        this.client = new Client()
            .setEndpoint(import.meta.env.REACT_APP_APPWRITE_ENDPOINT) // Your API Endpoint
            .setProject(import.meta.env.REACT_APP_APPWRITE_PROJECT_ID); // Your Project ID

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
        this.account = new Account(this.client);
    }

    async login(email, password) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            );
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

    async getDocuments() {
        try {
            const response = await this.databases.listDocuments(
                import.meta.env.REACT_APP_APPWRITE_DATABASE_ID,
                import.meta.env.REACT_APP_APPWRITE_COLLECTION_ID
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getDocument(documentId) {
        try {
            const response = await this.databases.getDocument(
                import.meta.env.REACT_APP_APPWRITE_DATABASE_ID,
                import.meta.env.REACT_APP_APPWRITE_COLLECTION_ID,
                documentId
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async searchDocumnetbyMobile(mobileNumber) {
        try {
            const response = await this.databases.listDocuments(
                import.meta.env.REACT_APP_APPWRITE_DATABASE_ID,
                import.meta.env.REACT_APP_APPWRITE_COLLECTION_ID,
                [Query.equal("mobile", mobileNumber)]
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getImageById(imageId) {
        console.log("imageId", imageId);
        try {
            const response = await this.storage.getFileView(
                // import env variables from .env file vite
                import.meta.env.REACT_APP_APPWRITE_STORAGE_BUCKET_ID,
                imageId
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const appwriteClient = new AppwriteClient();

export default AppwriteClient;
export { appwriteClient };
