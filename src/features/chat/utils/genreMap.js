export const emotionToGenreMap = {
    "😡 Angry": { id: 878, label: "Angry" },
    "😢 Sad": { id: 35, label: "Sad" },
    "😴 Bored": { id: 28, label: "Bored" },
    "😌 Relaxed": { id: 16, label: "Relaxed" },
    "😃 Happy": { id: 14, label: "Happy" },
    "❤️ In Love": { id: 10749, label: "In Love" },
};
export const getGenreFromEmotion = (emotion) => {
    return emotionToGenreMap[emotion] || null;
};
