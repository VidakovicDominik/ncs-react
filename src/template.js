export const customerTemplate = [
    {
        "Id": 900,
        "Name": "Caroline",
        "Surname": "Vicknair",
        "Email": "caroline0@adventure-works.com",
        "Telephone": "695-555-0158",
        "CityId": 10
    }
]

export const billTemplate = [

    {
        "Id": 50744,
        "Date": "2003-06-01T00:00:00",
        "BillNumber": "SO50744",
        "CustomerId": 101,
        "SellerId": 276,
        "CreditCardId": 9458,
        "Comment": null,
        "CreditCard": {
            "Id": 9458,
            "Type": "Diners",
            "CardNumber": "11111259113891",
            "ExpirationMonth": 9,
            "ExpirationYear": 2007
        },
        "Seller": {
            "Id": 276,
            "Name": "Robert",
            "Surname": "Williams",
            "PermanentEmployee": true
        }
    }]


export const itemTemplate = [
    {
        "Id": 34979,
        "BillId": 50744,
        "Quantity": 2,
        "ProductId": 817,
        "PricePerPiece": 180.1290,
        "TotalPrice": 360.258000,
        "Product": {
            "Id": 817,
            "Name": "HL Mountain Front Wheel",
            "ProductNumber": "FW-M928",
            "Color": "Black",
            "ProductSubcategoryID": 17
        }
    }]