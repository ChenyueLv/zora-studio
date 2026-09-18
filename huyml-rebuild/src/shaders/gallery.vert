// Adapted from the publicly delivered HUYML gallery shader. Original visual author: huyml.co.

varying vec2 vUv;

attribute vec3 aPosition;
attribute float aIndex;
attribute vec4 aTextureCoords;
attribute float aImageAspect;

uniform float uCurrentPage;
uniform float uPageThickness;
uniform float uPageWidth;
uniform float uPageHeight;
uniform float uMeshCount;
uniform float uTime;
uniform float uProgress;
uniform float uSplitProgress;
uniform float uPageSpacing;
uniform float uCenterSpacing;
uniform float uFocusRotationX;
uniform float uFocusRotationY;
uniform float uFocusRotationZ;

uniform float uScrollY;
uniform float uMaxX;
uniform float uSpeedY;
uniform float uScrollCurve;
uniform float uHoverIndex;
uniform float uHoverLift;
uniform float uHoverIndexOut;
uniform float uHoverLiftOut;

varying vec4 vTextureCoords;
varying float vIndex;
varying float vRotationProgress;
varying vec3 vPosition;
varying float vImageAspect;
varying float vFocusFactor;

mat3 getYrotationMatrix(float angle)
{
    return mat3(
        cos(angle), 0.0, sin(angle),
        0.0, 1.0, 0.0,
        -sin(angle), 0.0, cos(angle)
    );
}

mat3 getXrotationMatrix(float angle)
{
    return mat3(
        1.0, 0.0, 0.0,
        0.0, cos(angle), -sin(angle),
        0.0, sin(angle), cos(angle)
    );
}

mat3 getZrotationMatrix(float angle)
{
    return mat3(
        cos(angle), sin(angle), 0.0,
        -sin(angle), cos(angle), 0.0,
        0.0, 0.0, 1.0
    );
}

float remap(float value, float originMin, float originMax)
{
    return clamp((value - originMin) / (originMax - originMin),0.,1.);
}

float getXwave(float x)
{
    return sin(x*2.) * 0.4;
}

void main()
{
    float PI = 3.14159265359;

    vec3 rotationCenter = vec3(-uPageWidth*0.5, 0.0, 0.0);
    vec3 translatedPosition = position - rotationCenter;

    float rotationAcclerationProgress = remap(uProgress,0.,0.3);

    float delayBeforeStart = (aIndex / uMeshCount);
    float localRotAccelerationProgress = clamp((rotationAcclerationProgress - delayBeforeStart), 0.0, 1.0);

    float yAngle = -(position.x*0.2*smoothstep(0.,0.3,rotationAcclerationProgress) - rotationAcclerationProgress*2.*PI - localRotAccelerationProgress*2.*PI);

    float fullSpeedRotationAngle = remap(uProgress,0.3,0.7);
    yAngle += fullSpeedRotationAngle*4.2*PI;

    float stackingAngle = remap(uProgress,0.7,1.);

    yAngle += position.x*0.2*stackingAngle + (1.-localRotAccelerationProgress)*2.*PI*stackingAngle + PI*1.7*stackingAngle;

    float pageCrumple = (aIndex - (uMeshCount-1.)*0.5)*smoothstep(0.8,1.,stackingAngle)*((uPageWidth-translatedPosition.x-1.)*0.01);

    translatedPosition.z+= pageCrumple*(1.-uSplitProgress);

    float pageCrumpleAngle = (aIndex - (uMeshCount-1.)*0.5)*smoothstep(0.8,1.,stackingAngle)*((-pow(translatedPosition.x,2.))*0.002);
    yAngle+= pageCrumpleAngle;

    float stackingPages = (uMeshCount-aIndex) * uPageThickness*smoothstep(0.8,1.,stackingAngle);

    translatedPosition.z += stackingPages*(1.-uSplitProgress);

    yAngle-= pageCrumpleAngle*uSplitProgress;

    yAngle-=uSplitProgress*PI*0.4;

    translatedPosition.z += uSplitProgress*uPageSpacing*( - (aIndex - (uMeshCount-1.)*0.5));

    float boxCenterZ = uPageSpacing*( - (aIndex - (uMeshCount-1.)*0.5));

    float maxZ = uMeshCount * (uPageSpacing + uPageThickness) * 0.5;

    float centerZProgress = boxCenterZ - uScrollY;

    float flatWrappedCenterZ = mod(centerZProgress + maxZ, 2.0 * maxZ) - maxZ;

    float distanceToCenter = abs(flatWrappedCenterZ);
    float pushAmount = uCenterSpacing * uPageSpacing;

    float shiftMagnitude = smoothstep(0.1, uPageSpacing * 0.9, distanceToCenter) * pushAmount;

    float direction = sign(flatWrappedCenterZ);
    if (direction == 0.0) direction = 1.0;

    float shiftedWrappedCenterZ = flatWrappedCenterZ + direction * shiftMagnitude;

    float wrappedCenterZ = shiftedWrappedCenterZ - getXwave((position.y+uPageHeight*0.5)/uPageHeight)*clamp(uSpeedY*2.,-2.,2.)*uScrollCurve;

    float zOffset = wrappedCenterZ - boxCenterZ;

    translatedPosition.z += zOffset;

    vec3 rotatedPosition = getYrotationMatrix(yAngle) * translatedPosition;

    rotatedPosition.z-=uSplitProgress;

    float initialRotationProgress = remap(uProgress,0.,0.15);

    rotatedPosition += rotationCenter;
    rotatedPosition.x += initialRotationProgress*uPageWidth*0.5;

    float xAngle = -PI*0.2*initialRotationProgress;

    xAngle+=uSplitProgress*PI*0.2;

    vec3 newPosition = getXrotationMatrix(xAngle) * rotatedPosition;

    float focusFactor = 1.0 - smoothstep(0.0, uPageSpacing * 0.8, distanceToCenter);
    float smoothedFocusFactor = smoothstep(0.0, 1.0, focusFactor);
    float rotationFactor = smoothedFocusFactor;

    vec3 localFocusCenter = vec3(uPageWidth * 0.5, 0.0, 0.0);
    newPosition -= localFocusCenter;
    newPosition = getXrotationMatrix(uFocusRotationX * rotationFactor) * newPosition;
    newPosition = getYrotationMatrix(uFocusRotationY * rotationFactor) * newPosition;
    newPosition = getZrotationMatrix(uFocusRotationZ * rotationFactor) * newPosition;
    newPosition += localFocusCenter;

    float liftAmount = 0.0;
    if (abs(aIndex - uHoverIndex) < 0.5)    liftAmount = uHoverLift;
    if (abs(aIndex - uHoverIndexOut) < 0.5) liftAmount = max(liftAmount, uHoverLiftOut);

    float nonFocusFactor = smoothstep(0.05, 0.4, 1.0 - smoothedFocusFactor);
    float hoverAmount = liftAmount * nonFocusFactor;
    newPosition.y += hoverAmount * 0.25;

    vec4 modelPosition = modelMatrix * instanceMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vUv = uv;
    vTextureCoords=aTextureCoords;
    vIndex=aIndex;
    vRotationProgress=localRotAccelerationProgress;
    vImageAspect=aImageAspect;
    vFocusFactor=smoothedFocusFactor;
}
