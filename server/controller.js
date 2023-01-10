const houses = require("./db.json");
let globalID = 4;

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses);
    },

    createHouse: (req, res) => {
        const { address, price } = req.body;
        const getID = house => house.address === address;
        const index = houses.findIndex(getID);

        if (index !== -1) {
            res.status(409).send("House with that address already exists");
            return;
        }

        houses.push({id: globalID, ...req.body, price: +price});
        globalID++;
        res.status(200).send(houses);
    },

    deleteHouse: (req, res) => {
        const { id } = req.params;
        const getID = house => house.id === +id;
        const index = houses.findIndex(getID);

        if (index !== -1) {
            houses.splice(index, 1);
        }

        res.status(200).send(houses);
    },

    updateHouse: (req, res) => {
        const { id } = req.params;
        const { type } = req.body;
        const tenK = 10000;
        const getID = house => house.id === +id;
        const index = houses.findIndex(getID);

        if (index !== -1) {
            if (type === "plus") {
                houses[index].price += tenK;
            } else if (type === "minus") {
                if (houses[index].price - tenK > 0) {
                    houses[index].price -= tenK;
                } else {
                    houses[index].price = 0;                    
                }
            }
            res.status(200).send(houses);
        } else {
            res.status(404).send("Couldn't find a house with that id");
        }
    }
};