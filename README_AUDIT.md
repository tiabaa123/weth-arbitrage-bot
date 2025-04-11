# 🛡️ Smart Contract Audit Guide: WethArbitrage.sol

Ez a dokumentum végigvezet a kontrakt auditálási folyamaton, különösen Slither-rel történő automatikus elemzésen.

## ✅ Telepítés (Windows)

### Solidity compiler (solc)
```bash
pip install solc-select
solc-select install 0.8.20
solc-select use 0.8.20
solc --version
```

### Python & Slither
```bash
pip install slither-analyzer
```

## 🚀 Deploy & Audit szempontok

- Reentrancy védelem
- Gas limit kontroll
- Flashloan provider korlátozás
- Profit threshold ellenőrzés
- Approve optimalizáció
- Eseménylog (ArbitrageExecuted)

## 📦 Verifikációs eszközök

| Tool      | Célnak megfelelő          |
|-----------|----------------------------|
| Slither   | statikus elemzés           |
| MythX     | szimbolikus szintézis      |
| Echidna   | fuzzing tesztelés          |
| Hardhat   | deploy, teszt, verify      |
