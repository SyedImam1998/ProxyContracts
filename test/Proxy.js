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
    const ProxyUpgrade= await ethers.getContractAt("Logic1",proxy.address)

    return{proxy,logic1,logic2,ProxyUpgrade};
  }


    it("Should work logic1", async function () {
      const { proxy,logic1,logic2,ProxyUpgrade } = await loadFixture(deployFixture);

      await proxy.changeImplementation(logic1.address);
      assert.equal(await logic1.x(),0);
      
      await ProxyUpgrade.changeX(50);
      // assert.equal(await logic1.x(),50);

      expect(await await logic1.x()).to.equal(50);
    });


    it("Upgrading Contracts", async function () {
      const { proxy,logic1,logic2,ProxyUpgrade } = await loadFixture(deployFixture);

      await proxy.changeImplementation(logic1.address);
      assert.equal(await logic1.x(),0);
      
      await ProxyUpgrade.changeX(50);
      assert.equal(await logic1.x(),50);
      ////logic 2
      await proxy.changeImplementation(logic2.address);
      assert.equal(await logic2.x(),0);
      
      await ProxyUpgrade.changeX(150);
      assert.equal(await logic2.x(),150);

      
      
    });

    
 

 
});
