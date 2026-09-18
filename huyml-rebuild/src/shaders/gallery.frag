// Adapted from the publicly delivered HUYML gallery shader. Original visual author: huyml.co.

varying vec2 vUv;
varying vec4 vTextureCoords;
uniform sampler2D uAtlas;

varying float vIndex;
varying float vRotationProgress;
varying float vImageAspect;
varying float vFocusFactor;

uniform float uPageWidth;
uniform float uPageHeight;
uniform float uPicking;
uniform float uHoverIndex;
uniform float uHoverLift;
uniform float uHoverIndexOut;
uniform float uHoverLiftOut;

void main()
{
    float xStart = vTextureCoords.x;
    float xEnd = vTextureCoords.y;
    float yStart = vTextureCoords.z;
    float yEnd = vTextureCoords.w;

    float planeAspect = uPageWidth / uPageHeight;
    float imageAspect = vImageAspect;

    vec2 coverUv = vUv;

    if (planeAspect < imageAspect) {
        float scale = planeAspect / imageAspect;
        coverUv.x = (coverUv.x - 0.5) * scale + 0.5;
    } else {
        float scale = imageAspect / planeAspect;
        coverUv.y = (coverUv.y - 0.5) * scale + 0.5;
    }

    float textureHoverAmount = 0.0;
    if (abs(vIndex - uHoverIndex) < 0.5) {
        textureHoverAmount = uHoverLift;
    }
    if (abs(vIndex - uHoverIndexOut) < 0.5) {
        textureHoverAmount = max(textureHoverAmount, uHoverLiftOut);
    }
    textureHoverAmount *= smoothstep(0.65, 0.95, vFocusFactor);

    float textureScale = 1.0 - textureHoverAmount * 0.156;
    coverUv = (coverUv - 0.5) * textureScale + 0.5;

    vec2 atlasUV = vec2(
        mix(xStart, xEnd, coverUv.x),
        mix(yStart, yEnd, 1.0 - coverUv.y)
    );

    if(vRotationProgress==0. && vIndex!=0.)
    {
        discard;
    }

    if (uPicking > 0.5) {
        gl_FragColor = vec4((vIndex + 1.0) / 255.0, 0.0, 0.0, 1.0);
        return;
    }

    vec4 color = texture2D(uAtlas, atlasUV);

    gl_FragColor = color;
}
