async function loadEnergyData() {
    const [spotPrices, televisionEnergy, televisionEnergy55InchByScreenType, televisionEnergyAllSizesByScreenType] = await Promise.all([
        d3.csv("data/Ex5_ARE_Spot_Prices.csv", d3.autoType),
        d3.csv("data/Ex5_TV_energy.csv", d3.autoType),
        d3.csv("data/Ex5_TV_energy_55inchtv_byScreenType.csv", d3.autoType),
        d3.csv("data/Ex5_TV_energy_Allsizes_byScreenType.csv", d3.autoType)
    ]);

    window.energyData = {
        spotPrices,
        televisionEnergy,
        televisionEnergy55InchByScreenType,
        televisionEnergyAllSizesByScreenType
    };

    return window.energyData;
}

window.energyDataPromise = loadEnergyData();

window.energyDataPromise.catch((error) => {
    console.error("Failed to load energy data:", error);
});