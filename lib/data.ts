export interface Participant {
    id: string;
    name: string;
    channelName: string;
    avatarUrl: string;
    score: number;
    ranking: number;
    socialLink?: string;
}

export const participants: Participant[] = [
    {
        id: "1",
        name: "Ricardo Born",
        channelName: "Cara da Foto",
        avatarUrl: "https://github.com/shadcn.png", // Placeholder
        score: 850,
        ranking: 1,
        socialLink: "https://youtube.com/@CaradaFoto",
    },
    {
        id: "2",
        name: "Peter Jordan",
        channelName: "Ei Nerd",
        avatarUrl: "https://github.com/shadcn.png", // Placeholder
        score: 820,
        ranking: 2,
        socialLink: "https://youtube.com/@EiNerd",
    },
    {
        id: "3",
        name: "Gaveta",
        channelName: "Gaveta",
        avatarUrl: "https://github.com/shadcn.png", // Placeholder
        score: 780,
        ranking: 3,
        socialLink: "https://youtube.com/@Gaveta",
    },
    {
        id: "4",
        name: "Jovem Nerd",
        channelName: "Jovem Nerd",
        avatarUrl: "https://github.com/shadcn.png", // Placeholder
        score: 750,
        ranking: 4,
        socialLink: "https://youtube.com/@JovemNerd",
    },
    {
        id: "5",
        name: "Azaghal",
        channelName: "Jovem Nerd",
        avatarUrl: "https://github.com/shadcn.png", // Placeholder
        score: 720,
        ranking: 5,
        socialLink: "https://youtube.com/@JovemNerd",
    },
];
