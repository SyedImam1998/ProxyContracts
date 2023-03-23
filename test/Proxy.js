const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Lock", function () {

  async function deployFixture(){
    const Proxy=await ethers.getContractFactory("Proxy");
    const proxy=await Proxy.deploy();

    const Logic1=await ethers.getContractFactory("Logic1");
    const logic1=await Logic1.deploy();

    const Logic2=await ethers.getContractFactory("Logic2");
    const logic2=await Logic2.deploy();

    /// here proxy abi donot have the changgeX fuction so we supply the logic1 abi so etheres won't throw error.
    const ProxyUpgrade1= await ethers.getContractAt("Logic1",proxy.address)
    const ProxyUpgrade2= await ethers.getContractAt("Logic1",proxy.address)

    return{proxy,logic1,logic2,ProxyUpgrade1};
  }


    it("Should work logic1", async function () {
      const { proxy,logic1,logic2,ProxyUpgrade1 } = await loadFixture(deployFixture);

      await proxy.changeImplementation(logic1.address);
      assert.equal(await proxy.x(),0);
      
      await ProxyUpgrade1.changeX(50);
      // assert.equal(await logic1.x(),50);

      expect(await await proxy.x()).to.equal(50);
    });


    it("Upgrading Contracts", async function () {
      const { proxy,logic1,logic2,ProxyUpgrade1 } = await loadFixture(deployFixture);

      await proxy.changeImplementation(logic1.address);
      assert.equal(await proxy.x(),0);
      
      await ProxyUpgrade1.changeX(50);
      assert.equal(await proxy.x(),50);
      ////logic 2
      await proxy.changeImplementation(logic2.address);
      assert.equal(await proxy.x(),50);
      
      await ProxyUpgrade1.changeX(150);
      assert.equal(await proxy.x(),150);

      
      
    });

    
 

 
});
