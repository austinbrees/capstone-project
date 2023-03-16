import user from '../models/user.js';
import customers from "../models/customers.js";
import getCountryIso3 from "country-iso-2-to-3"
import redis from 'redis';


const redisClient = redis.createClient({ host: 'localhost', port: 6379 });


export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userFound = await user.findById(id);
        res.status(200).json(userFound);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCustomers = async (req, res) => {
    try {
        const customersData = await customers.find();
    
        res.status(200).json(customersData);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    };

export const getGeography = async (req, res) => {
      try {
          const customerData = await customers.find();
  
          const mappedLocations = customerData.reduce((acc, { country_id }) => {
            const countryISO3 = getCountryIso3(country_id);
            if(!acc[countryISO3]){
              acc[countryISO3] = 0;
            }
            acc[countryISO3] ++;
            return acc;
          });
          
          const formattedLocations = Object.entries(mappedLocations).map(([country_id, count]) => {
            return { id: country_id, value: count };
          }
          );
          res.status(200).json(formattedLocations);
        } catch (error) {
          res.status(404).json({ message: error.message });
        }
      };
  