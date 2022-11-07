import pandas as pd
import xml.etree.ElementTree as ET

# Load CSV file into DataFrame
df = pd.read_csv('bookings.csv')

# Create root element
root = ET.Element('Document', xmlns="urn:iso:std:iso:20022:tech:xsd:pain.008.001.02")

# Add group header
grp_hdr = ET.SubElement(root, 'CstmrDrctDbtInitn')
grp_hdr_header = ET.SubElement(grp_hdr, 'GrpHdr')
ET.SubElement(grp_hdr_header, 'MsgId').text = 'MSG001'
ET.SubElement(grp_hdr_header, 'CreDtTm').text = pd.Timestamp.now().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
ET.SubElement(grp_hdr_header, 'NbOfTxs').text = str(len(df))
ET.SubElement(grp_hdr_header, 'CtrlSum').text = str(df['seat_number'].sum())

# Add payment information
pmt_inf = ET.SubElement(grp_hdr, 'PmtInf')
ET.SubElement(pmt_inf, 'PmtInfId').text = 'PMT001'
ET.SubElement(pmt_inf, 'PmtMtd').text = 'DD'
ET.SubElement(pmt_inf, 'NbOfTxs').text = str(len(df))
ET.SubElement(pmt_inf, 'CtrlSum').text = str(df['seat_number'].sum())
ET.SubElement(pmt_inf, 'PmtTpInf').append(ET.Element('SvcLvl', Cd='SEPA'))
ET.SubElement(pmt_inf, 'PmtTpInf').append(ET.Element('LclInstrm', Cd='CORE'))
ET.SubElement(pmt_inf, 'PmtTpInf').append(ET.Element('SeqTp', Cd='OOFF'))
ET.SubElement(pmt_inf, 'ReqdColltnDt').text = pd.Timestamp.now().strftime('%Y-%m-%d')

# Add creditor details
cred = ET.SubElement(pmt_inf, 'Cdtr')
ET.SubElement(cred, 'Nm').text = 'NORDKURVE12 E.V.'

# Add creditor account
cred_acct = ET.SubElement(pmt_inf, 'CdtrAcct')
acct_id = ET.SubElement(cred_acct, 'Id')
ET.SubElement(acct_id, 'IBAN').text = 'DE73375514400100057538'

# Add creditor agent
cred_agent = ET.SubElement(pmt_inf, 'CdtrAgt')
fin_inst = ET.SubElement(cred_agent, 'FinInstnId')
ET.SubElement(fin_inst, 'BIC').text = 'WELADEDLLEV'

# Add payment charges
ET.SubElement(pmt_inf, 'ChrgBr').text = 'SLEV'

# Add direct debit transactions
for _, row in df.iterrows():
    tx_inf = ET.SubElement(pmt_inf, 'DrctDbtTxInf')
    pmt_id = ET.SubElement(tx_inf, 'PmtId')
    ET.SubElement(pmt_id, 'EndToEndId').text = 'NOTPROVIDED'
    ET.SubElement(tx_inf, 'InstdAmt', Ccy='EUR').text = str(row['seat_number'])
    
    mndt = ET.SubElement(tx_inf, 'DrctDbtTx')
    mndt_inf = ET.SubElement(mndt, 'MndtRltdInf')
    ET.SubElement(mndt_inf, 'MndtId').text = 'MANDATEID'  # You may need to generate or map this
    ET.SubElement(mndt_inf, 'DtOfSgntr').text = pd.Timestamp.now().strftime('%Y-%m-%d')

    # Add debtor details
    dbtr = ET.SubElement(tx_inf, 'Dbtr')
    ET.SubElement(dbtr, 'Nm').text = row['account_owner']

    # Add debtor account
    dbtr_acct = ET.SubElement(tx_inf, 'DbtrAcct')
    acct_id = ET.SubElement(dbtr_acct, 'Id')
    ET.SubElement(acct_id, 'IBAN').text = row['iban']

    # Add remittance information
    rmt_inf = ET.SubElement(tx_inf, 'RmtInf')
    ET.SubElement(rmt_inf, 'Ustrd').text = 'Busrundfahrt Nordkurve'

# Create the XML tree and write to file
tree = ET.ElementTree(root)
tree.write('bookings.xml', encoding='utf-8', xml_declaration=True)

print("XML file 'bookings.xml' has been created.")
