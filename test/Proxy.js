const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, assert } = require("chai");

describe("Lock", function () {

  async function deployFixture(){
    const Proxy=await ethers.getContractFactory("Proxy");
    const proxy=await Proxy.deploy();

    const Logic1=await ethers.getContractFactory("Logic1");
    const logic1=await Logic1.deploy();

    const Logic2=await ethers.getContractFactory("Logic2");
    const logic2=await Logic2.deploy();

    return{proxy,logic1,logic2};
  }


    it("Should work logic1", async function () {
      const { proxy,logic1,logic2 } = await loadFixture(deployFixture);

      await proxy.changeImplementation(logic1.address);
      assert.equal(await logic1.x(),0);
      
      await proxy.changeX(50);
      // assert.equal(await logic1.x(),50);

      expect(await await logic1.x()).to.equal(50);
    });

    
 

 
});