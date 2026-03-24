/**
 * Google Apps Script for Game Jam Registration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to your Google Sheet
 * 2. Extensions → Apps Script
 * 3. Paste this entire code
 * 4. Save (Ctrl+S)
 * 5. Deploy → New deployment
 * 6. Select type: Web app
 * 7. Execute as: Me
 * 8. Who has access: Anyone
 * 9. Deploy and copy the URL
 * 10. Add URL to your .env file as VITE_GOOGLE_SCRIPT_URL
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Append row with all form fields
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name,
      data.email,
      data.university,
      data.studyField,
      data.experience,
      data.role,
      data.teamStatus,
      data.dietaryRestrictions,
      data.tshirtSize,
      data.additionalInfo
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Game Jam Registration Service is running!' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Setup function to create headers (run once manually)
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const headers = [
    'Timestamp',
    'Name',
    'Email',
    'University',
    'Study Field',
    'Experience',
    'Role',
    'Team Status',
    'Dietary Restrictions',
    'T-Shirt Size',
    'Additional Info'
  ];
  
  // Set headers in first row
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Make headers bold
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  
  // Freeze the header row
  sheet.setFrozenRows(1);
  
  Logger.log('Sheet setup complete!');
}
