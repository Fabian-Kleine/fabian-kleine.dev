export default function RandomEmoji() {
    const emojis = ["👋", "🥶", "✌️", "🤖", "🖥️", "📱", "💻", "💾"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    return (
        <span className="text-xl">{randomEmoji}</span>
    );
}