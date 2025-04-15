interface RandomEmojiProps {
    birthday?: boolean;
}

export default function RandomEmoji({ birthday }: RandomEmojiProps) {
    let emojis = ["👋", "🥶", "✌️", "🤖", "🖥️", "📱", "💻", "💾"];
    if (birthday) {
        emojis = ["🎂", "🎉", "🎊", "🥳"];
    }
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    return (
        <span className="text-xl">{randomEmoji}</span>
    );
}