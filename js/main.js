
var app = new Vue({
    el: '#app',
    data: {
        bet: 0,
        pot: 0,
        callers: 0,
        outs: 9
    },
    computed: {
        alright: function() {
            if (this.pot <= 0 || this.bet <= 0)
                return false;
            return true;
        },
        potOdds: function() {
            return this.bet / this.sizeOfPot;
        },
        sizeOfPot: function() {
            return this.pot + this.bet + (this.bet * this.callers);
        },
        turnOdds: function() {
            return this.outs / 47;
        },
        riverOdds: function() {
            return this.outs / 46;
        },
        combinedOdds: function() {
            total_combinations = math.combinations(47, 2);
            win_combinations = math.combinations(this.outs, 2);
            //https://poker.stackexchange.com/questions/32/what-can-i-do-to-calculate-my-odds-in-a-hand
            hit = this.outs * (47 - this.outs)
            return (hit + win_combinations) / total_combinations;
        },
        callTurn: function() {
            if (this.turnOdds > this.potOdds) {
                return true;
            }
            return false;
        },
        callRiver: function() {
            if (this.riverOdds > this.potOdds) {
                return true;
            }
            return false;
        },
        callCombined: function() {
            if (this.combinedOdds > this.potOdds) {
                return true;
            }
            return false;
        }
    },
    filters: {
        percentage: function(value) {
            if(!value) value = 0;
        
            value = value * 100;
            return Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2) + "%";
        }
    }
})