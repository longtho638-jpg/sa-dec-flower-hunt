import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 100,
                    background: 'linear-gradient(to bottom right, #050505, #111)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10B981', // Emerald 500
                    borderRadius: '18%', // iOS squircle approximation
                }}
            >
                {/* High detail Node Leaf for Apple Icon */}
                <svg
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M7 11v 4a2 2 0 0 0 2 2h4" />
                    <path d="M11 11v-4a2 2 0 0 1 2 -2h4" />
                    <path d="M14 11h-4" />
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}
