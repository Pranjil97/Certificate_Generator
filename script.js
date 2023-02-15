
const generatePDF = async (name) => {
    const { PDFDocument, rgb, StandardFonts } = PDFLib;
    const exBytes = await fetch('./certificate-template.pdf').then(res => { return res.arrayBuffer() })
    // const newFont = await fetch('./Sanchez-Regular.ttf').then(res => { return res.arrayBuffer() })

    const pdfDoc = await PDFDocument.load(exBytes)

    const exFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    // pdfDoc.registerFontkit(fontKit);
    // const myFont = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages()
    const firstPg = pages[0]

    firstPg.drawText(name, {
        x: 210,
        y: 350,
        size: 42,
        font: exFont,
        color: rgb(.2, 0.84, 0.67),
    })

    const uri = await pdfDoc.saveAsBase64({ dataUri: true })
    saveAs(uri, "Certificate Generator.pdf", { autoBom: true })
    // window.open(uri)
    // document.querySelector('#mypdf').src = uri;

}

const submit = document.getElementById('Subbutton')
const inputvalue = document.getElementById('inputval')
submit.addEventListener('click', () => {
    const val = inputvalue.value
    generatePDF(val)
    // alert(val)
})


