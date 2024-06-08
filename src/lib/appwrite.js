import { Client, Databases, Storage, ID, Query, Account } from "appwrite";
import { useDispatch } from "react-redux";

class AppwriteClient {
    constructor() {
        this.client = new Client()
            .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your API Endpoint
            .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your Project ID

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
        this.account = new Account(this.client);
    }

    async login(email, password) {
        try {
            const response = await this.account.createEmailPasswordSession(
                email,
                password
            );

            return response;
        } catch (error) {
            throw error;
        }
    }

    async currentSession() {
        try {
            const response = await this.account.get();
            return response;
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
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                [
                    Query.limit(500),
                ]
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
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
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
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
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
                import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID,
                imageId
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async markVerified(documentId) {
        try {
            const response = await this.databases.updateDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                documentId,
                {
                    verified: true,
                }
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async markPresent(documentId) {
        try {
            const response = await this.databases.updateDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                documentId,
                {
                    present: true,
                }
            );
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async markAbsent(documentId) {
        try {
            const response = await this.databases.updateDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                documentId,
                {
                    present: false,
                }
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
