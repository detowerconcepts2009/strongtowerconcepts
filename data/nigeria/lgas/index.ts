import {
  getStates,
  getLGAsByState,
} from "@some19ice/nigeria-geo-core";

const nigeriaLGAs: Record<string, string[]> = Object.fromEntries(

  getStates().map((state) => [

    state.name,

    getLGAsByState(state.id).map(
      (lga) => lga.name
    ),

  ])

);

// Your application uses "FCT" as the state name.
// The package may expose it under a different administrative name,
// so explicitly map the package's FCT entry to "FCT".

const fctState = getStates().find((state) => {

  const name = state.name.toLowerCase();

  return (
    name.includes("federal capital") ||
    name === "fct" ||
    name.includes("abuja")
  );

});

if (fctState) {

  nigeriaLGAs.FCT =
    getLGAsByState(fctState.id).map(
      (lga) => lga.name
    );

}

export default nigeriaLGAs;