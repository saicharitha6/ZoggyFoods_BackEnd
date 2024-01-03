import React, { useState } from "react";
import { RouteConfig } from "@medusajs/admin";

const CustomLocation = () => {
  const [district] = useState("Chennai");
  const [selectedPincode, setSelectedPincode] = useState("");
  const pincodes = [
    "Abiramapuram	600018",
"Adyar	600020",
"Agaram	600082",
"Aminjikarai	600029",
"Anna Nagar	600040",
"Anna Nagar east	600102",
"Anna Nagar western extn	600101",
"Anna Road	600002",
"Arumbakkam	600106",
"Ashoknagar	600083",
"Aynavaram	600023",
"Besantnagar	600090",
"Broadway	600108",
"Cemetry Road	600021",
"Central Institute of technolog	600113",
"Central Leather research insti	600020",
"Chamiers Road	600018",
"Chennai Race course	600032",
"Chennai.	600001",
"Chepauk	600005",
"Chetput	600031",
"Chintadripet	600002",
"Choolai	600112",
"Choolaimedu	600094",
"D G vaishnav college	600106",
"Decosters Road	600012",
"Defence Officers colony	600032",
"Directorate Of tech education	600025",
"Dr. ambedkar nagar	600003",
"Edapalayam	600003",
"Egmore	600008",
"Ekkaduthangal	600032",
"Eldams Road	600018",
"Engineering College	600025",
"Erukkancheri	600118",
"Ethiraj Salai	600008",
"Flowers Road	600084",
"Foreshore Estate	600028",
"Fort St george	600009",
"G K m colony	600082",
"Gaudiyamath Road	600014",
"Golluvar Agraharam road	600021",
"Gopalapuram	600086",
"Government Estate	600002",
"Govt Stanley hospital	600001",
"Greams Road	600006",
"Guindy Industrial estate	600032",
"Guindy North	600015",
"High Court building	600104",
"Hindi Prachar sabha	600017",
"Icf Colony	600038",
"Indian Institute of technology	600036",
"Indira Nagar	600020",
"Jafferkhanpet	600083",
"Jam Bazaar	600014",
"Jawahar Nagar	600082",
"Kalaignar Karunanidhi nagar	600078",
"Kalmandapam	600013",
"Kasturibai Nagar	600020",
"Kdm West(mer with kdm)	600024",
"Kilpauk	600010",
"Kilpauk Medical college	600010",
"Kodambakkam	600024",
"Kodungaiyur	600118",
"Korrukupet	600021",
"Kosapet	600012",
"Kotturpuram	600085",
"Koyambedu	600107",
"Koyambedu Wholesale market com	600092",
"Krishnampet	600005",
"Kumaran Nagar	600033",
"Lloyds Estate	600014",
"Loyola College	600034",
"Mpt Ao	600001",
"Madras Electricity system	600002",
"Madras Medical college	600003",
"Madras Presidency college	600005",
"Madras University	600005",
"Mambalam R.s.	600033",
"Mandaveli	600004",
"Mannady	600001",
"Mettupalayam(mer With west mam	600033",
"Mint Building	600079",
"Muthialpet(ms)	600001",
"Mylapore	600004",
"Nandanam	600035",
"Nerkundram	600107",
"New Avadi road	600010",
"Nungambakkam	600034",
"Nungambakkam Bazaar	600034",
"Nungambakkam High road	600034",
"Old College buildings	600006",
"P C hostel	600030",
"Park Town	600003",
"Parthasarathy Koil	600005",
"Perambur	600011",
"Perambur Barracks	600012",
"Perambur High road	600012",
"Perambur North	600011",
"Pr. accountatn general	600018",
"Pudupakkam	600014",
"Pudupet	600002",
"Puliyanthope	600012",
"Purasawalkam	600084",
"Raja Annamalaipuram	600028",
"Rajathottam	600082",
"Rajbhavan	600022",
'Ramakrishna Nagar	600028',
"Rangarajapuram	600024",
"Rayapuram	600013",
"Ripon Buildings	600003",
"Royapettah	600014",
"Royapettah High road	600004",
"Royapuram Market	600013",
"Rv Nagar	600118",
"Saidapet	600015",
"Saidapet North	600015",
"Saidapet West(mer with sdp)	600015",
"Saligramam	600093",
"Santhome	600004",
"Sembiam	600011",
"Seven Wells	600001",
"Shastri Bhavan	600006",
"Shastri Nagar	600020",
"Shenoy Nagar	600030",
"Sowcarpet	600079",
"Sri Ayyappa nagar	600092",
"Strahans Road	600012",
"Teynampet	600018",
"Teynampet South	600018",
"Teynampet West	600006",
"Theosophical Society	600020",
"Thygaraya Nagar	600017",
"Thygaraya Nagar north	600017",
"Thygaraya Nagar south	600017",
"Tidel Park	600113",
"Tiruvallikkeni	600005",
"Tiruvanmiyur	600041",
"Tiruvanmiyur North	600041",
"Tondiarpet	600081",
"Tondiarpet Bazaar	600081",
"Tondiarpet West	600081",
"Triplicane South	600014",
"Ttti Taramani	600113",
"Vadapalani	600026",
"Velacheri	600042",
"Venkatesapuram	600012",
"Vepery	600007",
"Virugambakkam	600092",
"Vivekananda College madras	600004",
"Vyasar Nagar colony	600039",
"Vyasarpadi	600039",
"Washermanpet	600021",
"Washermanpet East	600021",
"West Mambalam	600033",
"World University centre	600031"

  ]

  return (
    <div className="large:px-xlarge py-xlarge bg-grey-5 min-h-content overflow-y-auto">
      <div className="xsmall:mx-base small:mx-xlarge medium:mx-4xlarge large:mx-auto large:max-w-7xl large:w-full h-full">

      <h2 className="inter-2xlarge-semibold mb-xsmall">Select Region</h2>

      <div>
        <label>Selected District: {district}</label>
      </div>

      <div>
        <label htmlFor="pincodeSelect">Select Pincode:</label>
        <select
          id="pincodeSelect"
          value={selectedPincode}
          onChange={(e) => setSelectedPincode(e.target.value)}
        >
          <option value="">Select</option>
          {pincodes.map((pincode, index) => (
            <option key={index} value={pincode}>
              {pincode}
            </option>
          ))}
        </select>
      </div>
      </div>
    </div>
  );
};

export const config: RouteConfig = {
  link: {
    label: "Locations",
  },
};

export default CustomLocation;
