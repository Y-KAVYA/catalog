const fs = require('fs');

// Function to decode a value from a given base
function decodeValue(value, base) {
    return BigInt(parseInt(value, base));
}

// Function to perform Lagrange interpolation and find the constant term
function lagrangeInterpolation(points) {
    const k = points.length;
    let c = BigInt(0);

    for (let i = 0; i < k; i++) {
        const { x: x_i, y: y_i } = points[i];
        let L_i = BigInt(1);

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                const { x: x_j } = points[j];
                L_i *= BigInt(x_j) / BigInt(x_j - x_i);
            }
        }
        c += y_i * L_i;
    }

    return c;
}

// Main function to read input and calculate constant term
function main() {
    // Load the JSON input
    const data = JSON.parse(fs.readFileSync('input.json', 'utf-8'));
    
    const n = data.keys.n;
    const k = data.keys.k;
    
    const points = [];

    // Decode each root
    for (let i = 1; i <= n; i++) {
        const base = parseInt(data[i].base);
        const value = data[i].value;
        const yDecoded = decodeValue(value, base);
        points.push({ x: i, y: yDecoded });
    }

    // Calculate the constant term c using only the first k points
    const c = lagrangeInterpolation(points.slice(0, k));
    
    // Print the result
    console.log("The constant term (c) is:", c.toString());
}

// Run the main function
main();
