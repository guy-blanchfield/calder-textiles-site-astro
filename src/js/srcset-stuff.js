const heroImage = "sheep";
const heroImageExt = "jpg";
const imagePath = "/images/";

const portraitSizes = [
    {
        width: "540",
        height: "960"
    },
    {
        width: "810",
        height: "1440"
    },
    {
        width: "1080",
        height: "1920"
    }
];

const landscapeSizes = [
    {
        width: "960",
        height: "720"
    },
    {
        width: "1440",
        height: "960"
    },
    {
        width: "1920",
        height: "1080"
    },
    {
        width: "2400",
        height: "1600"
    }
];

const portraitPaths = [];
const landscapePaths = [];

// /images/sheep-portrait-810x1440.jpg 810w

portraitSizes.forEach((portraitSize, i) => {
    portraitPaths[i] = `${imagePath}${heroImage}-portrait-${portraitSize.width}x${portraitSize.height}.${heroImageExt}`;
    console.log(`portraitPaths[${i}] is: ${portraitPaths[i]}`);
    console.log(`Index ${i} - width: ${portraitSize.width}, height: ${portraitSize.height}`);
});