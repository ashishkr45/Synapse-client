export const extractEmbedType = (url: string): string | null => {
  if (!url) return null;
  
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    // YouTube - multiple domains
    if (hostname.includes("youtube.com") || hostname.includes("youtu.be") || hostname.includes("m.youtube.com")) {
      return "youtube";
    }

    // Twitter/X - multiple domains
    if (hostname.includes("x.com") || hostname.includes("twitter.com")) {
      return "twitter";
    }

    // Instagram - multiple domains
    if (hostname.includes("instagram.com") || hostname.includes("instagr.am")) {
      return "instagram";
    }

    // LinkedIn - multiple domains
    if (hostname.includes("linkedin.com") || hostname.includes("lnkd.in")) {
      return "linkedin";
    }

    // Pinterest - multiple domains
    if (hostname.includes("pinterest.com") || hostname.includes("pin.it") || hostname.includes("pinterest.ca")) {
      return "pinterest";
    }

    // Facebook - multiple domains
    if (hostname.includes("facebook.com") || hostname.includes("fb.com") || hostname.includes("m.facebook.com")) {
      return "facebook";
    }

    return null;
  } catch (err) {
    console.warn("Invalid URL provided:", url);
    return null;
  }
};