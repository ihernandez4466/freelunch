
import { ApiMiddleware } from '../../../lib/middleware'

const handler = {
    get: async (req, res) => {
        try {
            const response = await fetch(
                "https://services.maps.cdtfa.ca.gov/api/taxrate/GetRateByAddress?city=Sonoma&zip=95476&address=500%20W%20Napa%20St");
            if (!response.ok) {
                throw new Error(`Unable to fetch tax API`);
            }
            const data = await response.json(); // Parse JSON response
            // Ensure taxRateInfo exists and extract the rate
            const taxRate = data.taxRateInfo?.[0] ?? 0;
            return res.status(200).json(taxRate);
        } catch (error) {
            throw new Error("Failed to fetch tax rate:", error);
        }
    }
}

export default ApiMiddleware(handler);