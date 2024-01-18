declare namespace User {
    interface Root {
        user: User;
    }

    interface User {
        id: number;
        role_id: number;
        email: string;
        name: string;
        token: string;
        photo: string | null;
    }
}
