
export const translateToMarathi = async (text: string): Promise<string> => {
    try {
        // Basic caching to avoid repeated requests for the same text
        const cacheKey = `trans_mr_${text}`;
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) return cached;

        const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=mr&dt=t&q=${encodeURIComponent(
                text
            )}`
        );
        const data = await response.json();
        const result = data[0][0][0];

        sessionStorage.setItem(cacheKey, result);
        return result;
    } catch (error) {
        console.error("Translation error:", error);
        return text; // Fallback to original text
    }
};

export const translateBatch = async (texts: string[]): Promise<string[]> => {
    // Process in chunks to avoid URL length limits if we were batching via URL
    // For now, simple Promise.all with individual requests
    // We could optimize this to use multiple 'q' parameters if needed
    return Promise.all(texts.map(text => translateToMarathi(text)));
};
