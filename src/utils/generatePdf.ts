import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type {
    TCustomerDue,
    TSupplierPayable,
} from "../redux/features/reports/reportsApi";

import NotoSansBengaliRegular from "../fonts/NotoSerifBengali-Regular.ttf";
import NotoSansBengaliBold from "../fonts/NotoSerifBengali-Bold.ttf";


// ==========================================
// Currency Formatter
// ==========================================

const formatAmount = (amount: number) => {
    return Number(amount || 0).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};


// ==========================================
// Load Font
// ==========================================

const loadFontAsBinary = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to load font: ${url}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    const uint8Array = new Uint8Array(arrayBuffer);

    let binary = "";

    const chunkSize = 0x8000;

    for (let i = 0; i < uint8Array.length; i += chunkSize) {
        binary += String.fromCharCode(
            ...uint8Array.subarray(i, i + chunkSize)
        );
    }

    return binary;
};


// ==========================================
// Setup PDF Fonts
// ==========================================

const setupFonts = async (doc: jsPDF) => {
    const regularFont = await loadFontAsBinary(
        NotoSansBengaliRegular
    );

    const boldFont = await loadFontAsBinary(
        NotoSansBengaliBold
    );

    doc.addFileToVFS(
        "NotoSansBengali-Regular.ttf",
        regularFont
    );

    doc.addFileToVFS(
        "NotoSansBengali-Bold.ttf",
        boldFont
    );

    doc.addFont(
        "NotoSansBengali-Regular.ttf",
        "NotoSansBengali",
        "normal"
    );

    doc.addFont(
        "NotoSansBengali-Bold.ttf",
        "NotoSansBengali",
        "bold"
    );

    // Default font
    doc.setFont("NotoSansBengali", "normal");
};


// ==========================================
// Customer Due PDF
// ==========================================

export const generateCustomerDuePdf = async (
    customers: TCustomerDue[]
) => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });


    // -------------------------------
    // Setup Bengali Font
    // -------------------------------

    await setupFonts(doc);


    // -------------------------------
    // Header
    // -------------------------------

    doc.setFontSize(18);
    doc.setFont("NotoSansBengali", "bold");

    doc.text(
        "Customer Due Report",
        105,
        18,
        {
            align: "center",
        }
    );


    doc.setFontSize(10);
    doc.setFont("NotoSansBengali", "normal");

    doc.text(
        `Generated: ${new Date().toLocaleString("en-US")}`,
        105,
        25,
        {
            align: "center",
        }
    );


    // -------------------------------
    // Table
    // -------------------------------

    const tableData = customers.map(
        (customer, index) => [
            index + 1,
            customer.name || "-",
            customer.phone || "-",
            customer.address || "-",
            formatAmount(customer.totalDue),
        ]
    );


    autoTable(doc, {
        startY: 32,

        head: [
            [
                "SL",
                "Customer",
                "Phone",
                "Address",
                "Total Due",
            ],
        ],

        body: tableData,

        theme: "grid",

        styles: {
            font: "NotoSansBengali",
            fontSize: 9,
            cellPadding: 3,
            valign: "middle",
        },

        headStyles: {
            font: "NotoSansBengali",
            fontStyle: "bold",
        },

        columnStyles: {
            0: {
                cellWidth: 12,
                halign: "center",
            },

            1: {
                cellWidth: 40,
            },

            2: {
                cellWidth: 32,
            },

            3: {
                cellWidth: 70,
            },

            4: {
                cellWidth: 32,
                halign: "right",
            },
        },

        didParseCell: (data) => {
            if (
                data.section === "body" &&
                data.column.index === 4
            ) {
                data.cell.styles.fontStyle = "bold";
            }
        },
    });


    // -------------------------------
    // Grand Total
    // -------------------------------

    const totalDue = customers.reduce(
        (sum, customer) =>
            sum + Number(customer.totalDue || 0),
        0
    );


    const finalY =
        (doc as any).lastAutoTable.finalY + 10;


    doc.setFontSize(12);
    doc.setFont("NotoSansBengali", "bold");

    doc.text(
        `Total Customer Due: ${formatAmount(totalDue)}`,
        200,
        finalY,
        {
            align: "right",
        }
    );


    // -------------------------------
    // Download
    // -------------------------------

    doc.save("customer-due.pdf");
};


// ==========================================
// Supplier Payable PDF
// ==========================================

export const generateSupplierPayablePdf = async (
    suppliers: TSupplierPayable[]
) => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });


    // -------------------------------
    // Setup Bengali Font
    // -------------------------------

    await setupFonts(doc);


    // -------------------------------
    // Header
    // -------------------------------

    doc.setFontSize(18);
    doc.setFont("NotoSansBengali", "bold");

    doc.text(
        "Supplier Payable Report",
        105,
        18,
        {
            align: "center",
        }
    );


    doc.setFontSize(10);
    doc.setFont("NotoSansBengali", "normal");

    doc.text(
        `Generated: ${new Date().toLocaleString("en-US")}`,
        105,
        25,
        {
            align: "center",
        }
    );


    // -------------------------------
    // Table
    // -------------------------------

    const tableData = suppliers.map(
        (supplier, index) => [
            index + 1,
            supplier.name || "-",
            supplier.phone || "-",
            supplier.address || "-",
            formatAmount(supplier.totalPayable),
        ]
    );


    autoTable(doc, {
        startY: 32,

        head: [
            [
                "SL",
                "Supplier",
                "Phone",
                "Address",
                "Total Payable",
            ],
        ],

        body: tableData,

        theme: "grid",

        styles: {
            font: "NotoSansBengali",
            fontSize: 9,
            cellPadding: 3,
            valign: "middle",
        },

        headStyles: {
            font: "NotoSansBengali",
            fontStyle: "bold",
        },

        columnStyles: {
            0: {
                cellWidth: 12,
                halign: "center",
            },

            1: {
                cellWidth: 40,
            },

            2: {
                cellWidth: 32,
            },

            3: {
                cellWidth: 70,
            },

            4: {
                cellWidth: 32,
                halign: "right",
            },
        },

        didParseCell: (data) => {
            if (
                data.section === "body" &&
                data.column.index === 4
            ) {
                data.cell.styles.fontStyle = "bold";
            }
        },
    });


    // -------------------------------
    // Grand Total
    // -------------------------------

    const totalPayable = suppliers.reduce(
        (sum, supplier) =>
            sum + Number(supplier.totalPayable || 0),
        0
    );


    const finalY =
        (doc as any).lastAutoTable.finalY + 10;


    doc.setFontSize(12);
    doc.setFont("NotoSansBengali", "bold");

    doc.text(
        `Total Supplier Payable: ${formatAmount(totalPayable)}`,
        200,
        finalY,
        {
            align: "right",
        }
    );


    // -------------------------------
    // Download
    // -------------------------------

    doc.save("supplier-payable.pdf");
};