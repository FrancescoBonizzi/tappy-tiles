import Defaults from "../Defaults.ts";

export default {

    getDarkerColor: (hex: string, factor: number) => {
        hex = hex.replace(/^#/, "");

        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        r = Math.max(0, Math.floor(r * (1 - factor)));
        g = Math.max(0, Math.floor(g * (1 - factor)));
        b = Math.max(0, Math.floor(b * (1 - factor)));

        const rHex = r.toString(16).padStart(2, "0");
        const gHex = g.toString(16).padStart(2, "0");
        const bHex = b.toString(16).padStart(2, "0");

        return `#${rHex}${gHex}${bHex}`;
    },

    getColorFromPageParams: () => {
        const params = new URLSearchParams(location.search);
        const choosenColorParameter = params.get("color");
        return choosenColorParameter
            ? `#${choosenColorParameter}`
            : Defaults.backgroundColor;
    }

}