const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });
    });
  });
});

describe("Creating Countries", () => {
  it("Should return that the country was created succesfully", async () => {
    let country = await Country.create({
      id: "COL",
      name: "Colombia",
      flag: "string",
      continent: "LATAM",
      capital: "bogota",
    });    
    expect(country.id).to.equal("COL");
    expect(country.name).to.equal("Colombia");
    expect(country.flag).to.equal("string");
    expect(country.continent).to.equal("LATAM");
    expect(country.capital).to.equal("bogota");
  });
  it("Should give an error if the capital is empty", async () => {
    let errorCatched = false
    try{
      let country = await Country.create({
        id: "BOL",
        name: "Bolivia",
        flag: "string",
        continent: "LATAM",
        capital: null,
      });
    }catch(err){
      errorCatched = true
    }
    expect(errorCatched).to.equal(true);
  });
});
