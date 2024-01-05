import { useState, useEffect } from "react";
import { RouteConfig } from "@medusajs/admin";
import { DropdownMenu, Label, Text, Button } from "@medusajs/ui"

const CustomLocation = () => {
  const [pincodes, setPincodes] = useState([]);
  const [deliverableAreas, setdeliverableAreas] = useState([]);
  const [selectedPincode, setSelectedPincode] = useState('');
  const [selectedPincodeId, setSelectedPincodeId] = useState('');
  const backendUrl = 'https://zoggy-foods.plts-dev.com';
  const fetchData = async () => {
    try {
      const response = await fetch(`${backendUrl}/store/locations`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data && data.locations) {
        const notDeliverableLocations = data.locations.filter(location => location["DeliveryLocation_is_deliverable"] == false);
        setPincodes(notDeliverableLocations);
        const deliverableLocations = data.locations.filter(location => location["DeliveryLocation_is_deliverable"] == true);
        setdeliverableAreas(deliverableLocations);
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
    try {
      const response = await fetch(`${backendUrl}/store/locations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locationId: selectedPincodeId,
          selectedArea: true
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update location');
      }

    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const handleDelete = async (deliveryLocationId) => {
    try {
      const response = await fetch(`${backendUrl}/store/locations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ locationId: deliveryLocationId, selectedArea: false }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete delivery location');
      }
      // If deletion is successful, update the state or fetch data again from the server to reflect changes
      fetchData();
    } catch (error) {
      console.error('Error deleting delivery location:', error);
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
      <div className="rounded-rounded bg-grey-0 border-grey-20 p-base medium:p-xlarge w-full border">
        <h2 className="text-xl font-semibold">Delivery Locations</h2>
      {/* <div className="rounded-rounded bg-grey-0 border-grey-20 flex h-full w-full flex-col overflow-hidden border min-h-[350px]"> */}
        {/* Your second card content goes here */}
        {/* <h2 className="text-xl font-semibold">Delivery Locations</h2> */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pincode</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deliverableAreas.map((item, index) => (
              <tr key={item.DeliveryLocation_id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.DeliveryLocation_id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.DeliveryLocation_area}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.DeliveryLocation_pincode}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(item.DeliveryLocation_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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