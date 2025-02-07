export interface EmotionGenre {
	id: number;
	label: string;
}

export const emotionToGenreMap: Record<string, EmotionGenre> = {
	"😡 Angry": { id: 878, label: "Angry" },
	"😢 Sad": { id: 35, label: "Sad" },
	"😴 Bored": { id: 28, label: "Bored" },
	"😌 Relaxed": { id: 16, label: "Relaxed" },
	"😃 Happy": { id: 14, label: "In Love" },
	"❤️ In Love": { id: 10749, label: "In Love" },
};

export const getGenreFromEmotion = (emotion: string): EmotionGenre | null => {
	return emotionToGenreMap[emotion] || null;
};
