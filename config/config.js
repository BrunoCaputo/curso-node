const env = process.env.NODE_ENV || "dev";

const config = () => {
    switch (env) {
        case "dev":
            return {
                bd_string: "mongodb://localhost:27017/curso_node",
                jwt_pass: "DEV_PASS",
                jwt_expires_in: "7d"
            };
        case "hml":
            return {
                bd_string: "mongodb://localhost:27017/curso_node",
                jwt_pass: "HML_PASS",
                jwt_expires_in: "7d"
            };
        case "prod":
            return {
                bd_string: "mongodb://localhost:27017/curso_node",
                jwt_pass: "PROD_PASS",
                jwt_expires_in: "7d"
            };
    }
};

console.log(`Inciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();
