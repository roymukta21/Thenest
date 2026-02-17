// Mock database for development when MongoDB is unavailable
let mockBookings = [];

export const mockDB = {
  // Find bookings by email
  findBookings: async (email) => {
    return mockBookings.filter(b => b.userEmail === email);
  },

  // Create a new booking
  createBooking: async (bookingData) => {
    const newBooking = {
      _id: Date.now().toString(),
      ...bookingData,
      status: bookingData.status || "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockBookings.push(newBooking);
    return newBooking;
  },

  // Delete a booking
  deleteBooking: async (id) => {
    const index = mockBookings.findIndex(b => b._id === id);
    if (index > -1) {
      const deleted = mockBookings[index];
      mockBookings.splice(index, 1);
      return deleted;
    }
    return null;
  },

  // Clear all mock data
  clear: () => {
    mockBookings = [];
  }
};
