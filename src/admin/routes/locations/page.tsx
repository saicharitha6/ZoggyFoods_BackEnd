import { useState, useEffect } from "react";
import { RouteConfig } from "@medusajs/admin";
import { DropdownMenu, Label, Text, Button } from "@medusajs/ui"

const CustomLocation = () => {
  const [pincodes, setPincodes] = useState([]);
  const [selectedPincode, setSelectedPincode] = useState('');
  const [selectedPincodeId, setSelectedPincodeId] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('https://logesh.ngrok.app/store/locations');
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      if (data && data.locations) {
        setPincodes(data.locations);
      }
    } catch (error) {
      console.error('Error fetching pincodes:', error);
    }
  };
  useEffect(() => {
    fetchData()
  }, []);


  const handlePincodeSelect = (item) => {
    setSelectedPincode(item.DeliveryLocation_area + " " + item.DeliveryLocation_pincode);
    setSelectedPincodeId(item.DeliveryLocation_id)
  };
  const captureSelectedArea = async () => {
    // Handle capturing the selected area on button click
    console.log("Selected Area:", selectedPincode);
    try {
      const response = await fetch('https://logesh.ngrok.app/store/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locationId: selectedPincodeId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update location');
      }

      // Add any logic here after the location table is updated
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  return (
    <div className="gap-y-xsmall flex flex-col">
      <div className="rounded-rounded bg-grey-0 border-grey-20 p-base medium:p-xlarge w-full border">
        <h2 className="text-xl font-semibold">Select Region</h2>
        <div className="mt-4">
          <Label> Default District:</Label>
          <Text> Chennai </Text>
          <DropdownMenu>
            <Label>
              Select Area
            </Label>
            <DropdownMenu.Trigger>
              <button className="rounded-full border border-gray-200 bg-gray-50 focus-within:shadow-cta focus-within:border-violet-600 pl-3 pr-4 h-10 flex items-center w-full">
                {selectedPincode || "Select Area"}
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {pincodes.length > 0 ? (
                pincodes.map((item, index) => (
                  <DropdownMenu.Item
                    key={item.DeliveryLocation_id}
                    onSelect={() => handlePincodeSelect(item)}
                  >
                    {item.DeliveryLocation_area + " " + item.DeliveryLocation_pincode}
                  </DropdownMenu.Item>
                ))
              ) : (
                <p>Loading...</p> // Or any loading indicator
              )}
            </DropdownMenu.Content>
          </DropdownMenu>
          <Button onClick={captureSelectedArea}>
            Capture Selected Area
          </Button>
        </div>
      </div>
      <div className="rounded-rounded bg-grey-0 border-grey-20 flex h-full w-full flex-col overflow-hidden border min-h-[350px]">
        {/* Your second card content goes here */}
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