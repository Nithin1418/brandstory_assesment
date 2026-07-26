// Fan of soft diagonal light rays, like sunbeams breaking through clouds
// above the arch. Rays stay concentrated in the upper portion of the
// section and taper out well before reaching the arch peak/text.
import Image from "next/image";

const RAYS = [
    { angle: 28, left: "10%", width: "12%", opacity: 0.18 },
    { angle: 24, left: "25%", width: "11%", opacity: 0.24 },
    { angle: 26, left: "40%", width: "10%", opacity: 0.16 },
    { angle: 22, left: "55%", width: "10%", opacity: 0.16 },
    { angle: 25, left: "70%", width: "11%", opacity: 0.24 },
    { angle: 20, left: "85%", width: "12%", opacity: 0.18 },
];
export default function TiltedLight() {
    // vertical fade: rays are fully visible only near the very top and
    // dissolve out around ~45% of the section height, well above the arch
    const verticalFade =
        "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 22%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0) 46%)";

    return (
        <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
            {/* {RAYS.map((ray, i) => (
                <div
                    key={i}
                    className="absolute h-full"
                    style={{
                        left: ray.left,
                        top: "-15%",
                        width: ray.width,
                        transform: `rotate(${ray.angle}deg)`,
                        transformOrigin: "top center",
                        background: `linear-gradient(90deg, transparent 0%, rgba(167, 139, 250, ${ray.opacity * 1.6}) 50%, transparent 100%)`,
                        WebkitMaskImage: verticalFade,
                        maskImage: verticalFade,
                        filter: "blur(45px)",
                        mixBlendMode: "screen",
                    }}
                />
            ))} */}

        </div>
    );
}